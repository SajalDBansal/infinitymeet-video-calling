// store/meetingStore.ts
import { MeetingStateType } from '@infinityMeet/types';
import { create } from 'zustand';


export const useMeetingStore = create<MeetingStateType>((set) => ({
    fullMeeting: null,
    metadata: null,
    host: null,
    participants: [],
    messages: [],
    transcript: null,
    recordings: [],
    summary: null,

    setFullMeeting: (meeting) => set({ fullMeeting: meeting }),
    setMetadata: (metadata) => set({ metadata }),
    setHost: (host) => set({ host }),
    setParticipants: (users) => set({ participants: users }),
    setMessages: (msgs) => set({ messages: msgs }),
    setTranscript: (transcript) => set({ transcript }),
    setRecordings: (recs) => set({ recordings: recs }),
    setSummary: (summary) => set({ summary }),
}));
