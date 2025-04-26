interface Conversation {
  id?: string;
  user?: string|File|undefined;
  gemini?: string;
  file?: File
}
export default Conversation