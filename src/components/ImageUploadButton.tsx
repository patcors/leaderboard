import { FormEvent, useState } from "react";

type ImageUploadButtonProps = {
  submitSource: (file: File) => void;
};

const ImageUploadButton = ({ submitSource }: ImageUploadButtonProps) => {
  const [file, setFile] = useState<File>();
  const handleCapture = (event: FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.files?.[0]);
    const newFile = event.currentTarget.files?.[0] as File;
    console.log(newFile);
    setFile(newFile);
  };

  const handleSubmit = () => {
    if (file) {
      console.log(file);
      submitSource(file);
    } else {
      console.warn("no file selected yet");
    }
  };

  return (
    <>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={handleCapture}
      />
      <label htmlFor="icon-button-file">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
          />
        </svg>
      </label>
      <button onClick={handleSubmit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </>
  );
};

export default ImageUploadButton;
