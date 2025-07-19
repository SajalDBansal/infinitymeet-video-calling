"use server";

import { createNewMeeting } from "@infinityMeet/database";
import { MeetingType } from "@infinityMeet/types";

export async function addNewMeeting(meeting: MeetingType) {
    if (!meeting) return;

    await createNewMeeting(meeting);
}
