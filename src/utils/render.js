import { marked } from "marked";
import DOMPurify from "dompurify";
export const markdown = (string) => {
  return marked.parse(DOMPurify.sanitize(string));
};
