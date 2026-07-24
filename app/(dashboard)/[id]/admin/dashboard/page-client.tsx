"use client";

import { Button } from "@/components/ui/button";

export const AdminDashboardPage = () =>  {
  // const generateInviteLink = async () => {
  //   const res = await fetch(`/api/admin/tournaments/${params.id}/invite-code`);
  //   const data = await res.json();
  //   navigator.clipboard.writeText(`${window.location.origin}/join/${data.code}`);
  //   alert('Посилання для приєднання скопійовано!');
  // };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Учасники турніру</h1>
        <Button onClick={() => {}}>Скопіювати запрошення 🔗</Button>
      </div>
    </div>
  );
}
