"use client";

import { useState } from "react";
import { InviteUserCard } from "./components/invite-user-card";
import { AddParticipantCard } from "./components/add-participant-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MailCheck } from "lucide-react";
import { getParticipantsOverview } from "@/lib/api";
import { useParams } from "next/navigation";
import { PendingInvitationsTable } from "./components/invitations-table";
import { ActiveMembersTable } from "./components/members-table";

export const AdminParticipants = () => {
  const { id: tournamentId } = useParams<{ id: string }>();

  const { data, refetch } = getParticipantsOverview({ tournamentId });

  const [userTable, setUserTable] = useState<"active" | "pending">("active");

  const tabs = [
    {
      title: "Active members",
      value: "active",
      icon: Users,
    },
    {
      title: "Pending confirmation",
      value: "pending",
      icon: MailCheck,
    },
  ];

  return (
    <div className="space-y-8 mx-auto">
      <div className="flex flex-col gap-y-2 border-b border-brand-border/40 pb-4">
        <h1 className="text-2xl font-semibold text-white">Members</h1>
        <p className="text-sm text-gray-400 font-normal">
          Add active players to the tournament or send invites to new users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <AddParticipantCard onSuccess={refetch} />
        <InviteUserCard onSuccess={refetch} />
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <div className="flex max-md:flex-col gap-4 justify-between">
          <h1 className="text-xl font-semibold text-white">
            Tournament participants
          </h1>
          <Tabs
            value={userTable}
            onValueChange={setUserTable}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-brand-container border !border-brand-border flex flex-wrap h-auto p-1 w-full gap-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full text-gray-400 text-xs px-3 py-1.5"
                  >
                    <Icon className="size-3.5" />
                    <span>{tab.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
        {userTable === "active" ? (
          <ActiveMembersTable data={data?.data.participants || []} />
        ) : (
          <PendingInvitationsTable data={data?.data.pendingInvitations || []} />
        )}
      </div>
    </div>
  );
};
