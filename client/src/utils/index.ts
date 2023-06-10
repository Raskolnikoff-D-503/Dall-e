import FileSaver from "file-saver";

import { surpriseMePrompts } from "../constants";

/**
 * function returns a random prompt from an existing list
 * @param prompt current prompt
 * @returns random prompt
 */
export const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return randomPrompt;
};

/**
 * function that allows to save file in jpg format
 * @param _id image ID
 * @param photo file url
 */

export const downloadImage = async (_id: string, photo: string) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
};
