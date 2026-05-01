export type ImportedEmployee = {
  fullName: string;
  email?: string;
  cpf?: string;
  jobTitle?: string;
  unitName?: string;
};

export type ImportRowIssue = {
  row: number;
  field?: keyof ImportedEmployee;
  message: string;
};

export type ImportPreview = {
  employees: ImportedEmployee[];
  issues: ImportRowIssue[];
  detectedColumns: Record<string, keyof ImportedEmployee>;
};

export function normalizeCpf(value?: string) {
  return String(value ?? '').replace(/\D/g, '').slice(0, 11);
}

export function formatCpf(value?: string) {
  const digits = normalizeCpf(value);
  if (digits.length !== 11) return digits;
  return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

const LOWERCASE_PARTICLES = new Set(['da', 'de', 'do', 'das', 'dos', 'e']);
const NAME_REPLACEMENTS: Record<string, string> = {
  jr: 'Junior',
  'jr.': 'Junior',
  junior: 'Junior',
  filho: 'Filho',
  neto: 'Neto',
  sobrinho: 'Sobrinho',
};

export function normalizePersonName(value?: string) {
  return String(value ?? '')
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part, index) => {
      const clean = part.toLowerCase();
      if (NAME_REPLACEMENTS[clean]) return NAME_REPLACEMENTS[clean];
      if (index > 0 && LOWERCASE_PARTICLES.has(clean)) return clean;
      return clean.charAt(0).toLocaleUpperCase('pt-BR') + clean.slice(1);
    })
    .join(' ');
}

export function normalizeJobTitle(value?: string) {
  const normalized = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (!normalized) return undefined;
  return normalized.charAt(0).toLocaleUpperCase('pt-BR') + normalized.slice(1);
}

const FIELD_ALIASES: Record<keyof ImportedEmployee, string[]> = {
  fullName: ['nome', 'nome completo', 'colaborador', 'funcionario', 'funcionário', 'employee', 'name', 'full name'],
  email: ['email', 'e-mail', 'mail', 'email institucional', 'e-mail institucional', 'email profissional'],
  cpf: ['cpf', 'documento', 'doc', 'cadastro de pessoa fisica', 'cadastro de pessoa física'],
  jobTitle: ['cargo', 'funcao', 'função', 'funcao cargo', 'função cargo', 'setor cargo', 'papel', 'role', 'job title'],
  unitName: ['unidade', 'campus', 'escola unidade', 'filial', 'setor', 'departamento'],
};

function normalizeHeader(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[_\-.;/\\|()[\]{}]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const NORMALIZED_ALIAS_TO_FIELD = Object.entries(FIELD_ALIASES).reduce<Record<string, keyof ImportedEmployee>>(
  (acc, [field, aliases]) => {
    for (const alias of aliases) acc[normalizeHeader(alias)] = field as keyof ImportedEmployee;
    return acc;
  },
  {},
);

export function detectEmployeeColumn(header: string): keyof ImportedEmployee | undefined {
  return NORMALIZED_ALIAS_TO_FIELD[normalizeHeader(header)];
}

export function previewEmployeeRows(rows: Array<Record<string, unknown>>): ImportPreview {
  const issues: ImportRowIssue[] = [];
  const detectedColumns: Record<string, keyof ImportedEmployee> = {};
  const employees: ImportedEmployee[] = [];

  rows.forEach((row, index) => {
    const employee: Partial<ImportedEmployee> = {};
    const rowNumber = index + 1;

    for (const [header, rawValue] of Object.entries(row)) {
      const field = detectEmployeeColumn(header);
      if (!field) continue;

      detectedColumns[header] = field;
      const value = String(rawValue ?? '').trim();
      if (value) employee[field] = value;
    }

    employee.fullName = normalizePersonName(employee.fullName);
    employee.jobTitle = normalizeJobTitle(employee.jobTitle);
    employee.unitName = employee.unitName?.replace(/\s+/g, ' ').trim() || undefined;
    employee.email = employee.email?.trim().toLowerCase() || undefined;

    if (!employee.fullName) {
      issues.push({ row: rowNumber, field: 'fullName', message: 'Nome completo não identificado.' });
      return;
    }

    if (employee.email && !/^\S+@\S+\.\S+$/.test(employee.email)) {
      issues.push({ row: rowNumber, field: 'email', message: 'E-mail parece inválido.' });
    }

    if (employee.cpf) {
      employee.cpf = normalizeCpf(employee.cpf);
      if (employee.cpf.length !== 11) {
        issues.push({ row: rowNumber, field: 'cpf', message: 'CPF deve ter 11 dígitos.' });
      }
    }

    employees.push(employee as ImportedEmployee);
  });

  if (!Object.values(detectedColumns).includes('fullName')) {
    issues.unshift({ row: 0, field: 'fullName', message: 'Nenhuma coluna de nome foi reconhecida.' });
  }

  return { employees, issues, detectedColumns };
}

export function parseSimpleCsv(csv: string): Array<Record<string, string>> {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];

  const delimiter = lines[0].includes(';') && !lines[0].includes(',') ? ';' : ',';
  const headers = splitCsvLine(lines[0], delimiter);

  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line, delimiter);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  });
}

function splitCsvLine(line: string, delimiter: string) {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && insideQuotes && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === delimiter && !insideQuotes) {
      result.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}
