import { createSlice } from "@reduxjs/toolkit";

const initialQueueState = {
  queue: {
    queueStatus: false,
    queueData: {}
  },
};

export const QueueSlice = createSlice({
  name: "queue",
  initialState: {
    queue: initialQueueState,
  },
  reducers: {
    addQueue: (state, action) => {
      state.queue = action.payload;
    },
    removeQueue: (state) => {
      state.queue = initialQueueState;
    },
  },
});

export const { addQueue, removeQueue } = QueueSlice.actions;

export default QueueSlice.reducer;