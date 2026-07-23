export default function NoTournamentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <h1 className="text-2xl font-bold mb-2">
        У вас поки немає активних турнірів
      </h1>
      <p className="text-muted-foreground mb-6">
        Очікуйте на запрошення від адміністратора або введіть код турніру.
      </p>
    </div>
  );
}
