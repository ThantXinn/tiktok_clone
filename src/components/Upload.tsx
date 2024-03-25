/** @format */
"use client";
import { config } from "@/utils/config";
import { topics } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { SanityAssetDocument } from "next-sanity";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { client } from "../../sanity/lib/client";

const Upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
  const [wrongFileType, setWrongFileType] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const [topic, setTopic] = useState<string>(topics[0].name);
  const [savingPost, setSavingPost] = useState<boolean>(false);
  const { data: session } = useSession();

  const router = useRouter();
  const handlerUplaodVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && topic && videoAsset?._id) {
      setSavingPost(true);

      await fetch(`${config.apiBaseUrl}/api/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ caption, videoAsset, topic, session }),
      });
      router.push("/");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setWrongFileType(false);
    setVideoAsset(undefined);
    setCaption("");
    setTopic("");
  };
  return (
    <div className='flex w-full h-full justify-center mb-10 pt-10 absolute left-10 top-0'>
      <div className='bg-white rounded-lg flex flex-wrap xl:h-[80vh] gap-6 items-center justify-center p-14 pt-7'>
        <div>
          <div>
            <h3 className='text-xl font-bold'>Upload Video</h3>
            <p className='text-md text-gray-400 mt-1'>
              Post a video to your account
            </p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-5 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p className='flex items-center justify-center gap-2'>
                <span>
                  <AiOutlineLoading3Quarters className='animate-spin duration-150' />
                </span>
                <span className='animate-pulse duration-150'>Uploading...</span>
              </p>
            ) : (
              <div className='w-[250px]'>
                {!videoAsset ? (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center h-full'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold'>Upload Video</p>
                      </div>
                      <p className='text-center text-gray-400 mt-10 text-sm leading-8'>
                        MP4 or <br />
                        WebM or
                        <br />
                        ogg
                        <br />
                        720x1280 or higher
                        <br />
                        Up to 10 minutes
                        <br />
                        Less than 2GB
                      </p>
                      <div className='flex gap-2 items-center justify-center rounded w-36 h-10 border-slate-200 mt-7 outline-none bg-btnColor'>
                        <p className='text-lg font-medium p-1 text-white'>
                          Select Video
                        </p>
                      </div>
                      <input
                        type='file'
                        name='upload-video'
                        onChange={(e) => handlerUplaodVideo(e)}
                        className='w-0 h-0'
                      />
                    </div>
                  </label>
                ) : (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className='rounded-xl h-[450px] bg-black lg:w-[600px]'></video>
                  </div>
                )}
                {wrongFileType && (
                  <p className='text-xl text-[#EC4264] font-semibold mt-4 w-[250px]'>
                    Please select a video file
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <label>Caption</label>
          <input
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='rounded border-[1px] border-gray-300 outline-none p-2 text-lg font-light'
          />
          <label>Choose Category</label>
          <select
            onChange={(e) => setTopic(e.target.value)}
            className='rounded border-[1px] border-gray-300 outline-none p-2 text-lg font-medium capitalize cursor-pointer'>
            {topics.map((item) => (
              <option
                key={item.name}
                className='outline-none capitalize bg-white text-gray-800 text-sm font-medium p-2 hover:bg-slate-400'>
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex justify-center gap-4 mt-4'>
            <button
              type='button'
              className='border-[1px] rounded p-2 text-md font-medium w-24'
              onClick={handleDiscard}>
              Discard
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              type='button'
              className={`border-[1px] rounded p-2 text-md font-medium w-24 ${
                videoAsset?.url ? "bg-[#EC4264]" : "bg-slate-300"
              } text-white`}
              onClick={handlePost}>
              {savingPost ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
