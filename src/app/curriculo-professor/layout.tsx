export default function CurriculoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // LP dedicada — sem Navbar e Footer globais
  return <>{children}</>
}
