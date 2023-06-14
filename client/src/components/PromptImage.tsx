import { preview } from "../assets";

type Props = {
  photo: string | undefined;
  prompt: string;
};

const PromptImage = ({ photo, prompt }: Props) => {
  if (photo) {
    <img src={photo} alt={prompt} className="w-full h-full object-contain" />;
  }

  return (
    <img
      src={preview}
      alt="preview"
      className="w-9/12 h-9/12 object-contain opacity-40"
    />
  );
};

export default PromptImage;
