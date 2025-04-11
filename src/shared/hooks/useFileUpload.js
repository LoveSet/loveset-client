import { useState, useRef, useCallback, useEffect } from "react";
import axios, { CancelToken } from "axios";
import { toast } from "react-toastify";
import { useAuthState } from "../context/useAuthContext";
import {
  API_ENDPOINTS,
  BASE_URL,
  FILES_URL,
  FILES_URL2,
} from "../config/endpoints";
import allowedFileTypes from "../utils/allowedFileTypes";

const useFileUpload = () => {
  const { user } = useAuthState();

  const [uploadingFile, setUploadingFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [media, setMedia] = useState([]);
  const [croppedImg, setCroppedImg] = useState(null); // Added state for cropped image
  const [originalImg, setOriginalImg] = useState(null); // Added state for original image
  const [aspectRatio, setAspectRatio] = useState(null); // Aspect ratio for cropping
  const cancelFileUpload = useRef(null);

  const cancelUpload = useCallback(() => {
    if (cancelFileUpload.current) {
      cancelFileUpload.current("User has canceled the file upload.");
      resetUploadState();
    }
  }, []);

  const resetUploadState = () => {
    setUploadingFile(null);
    setUploadProgress(0);
  };

  const getFileType = (file) => {
    if (file.type) {
      const fileType = file.type.split("/")[0];

      // Handle specific case for SVG files
      if (file.type === "image/svg+xml") {
        return "document";
      }

      if (
        fileType === "image" ||
        fileType === "video" ||
        fileType === "audio"
      ) {
        return fileType;
      } else if (allowedFileTypes.document.includes(file.type)) {
        return "document";
      }
    }

    // Handle files without MIME type
    const extension = file.name.split(".").pop().toLowerCase();

    const extensionMappings = {
      md: "document",
      yml: "document",
      yaml: "document",
      sql: "document",
      tex: "document",
      srt: "document",
      // Add more mappings as needed
    };

    if (extension in extensionMappings) {
      return extensionMappings[extension];
    }

    // If we can't determine the type, we'll return null or a default type
    return null; // or return "document" if you want to treat unknown types as documents
  };

  const fileRoute = (fileType) => {
    if (fileType == "image") {
      return API_ENDPOINTS.UPLOAD_IMAGE;
    } else if (fileType == "video") {
      return API_ENDPOINTS.UPLOAD_VIDEO;
    } else if (fileType == "audio") {
      return API_ENDPOINTS.UPLOAD_AUDIO;
    } else if (fileType == "document") {
      return API_ENDPOINTS.UPLOAD_DOCUMENT;
    }
  };

  const handleFileChange = useCallback(
    async (file, requireContent = false, latex = false) => {
      try {
        console.log(media, "test");

        if (media?.length == 5) {
          toast.error(
            "Upload limit exceeded. You can only upload up to 5 files."
          );
          return;
        }

        // our own definition of what a fileType should be :)
        const fileType = getFileType(file);

        if (fileType === "video" && file.size > 3 * 1024 * 1024 * 1024) {
          toast.error("Your video is too large. Try to keep it 3GB or less.");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        if (fileType === "video" && requireContent) {
          // You can get this value from a state, prop, or user preference
          formData.append("requireContent", true);
        }

        if (fileType === "image" && latex) {
          // You can get this value from a state, prop, or user preference
          formData.append("latex", true);
        }

        console.log("file*", file);

        const config = {
          headers: { Authorization: `Bearer ${user?.token}` },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
          cancelToken: new CancelToken(
            (cancel) => (cancelFileUpload.current = cancel)
          ),
        };

        const FILE_ROUTE = fileRoute(fileType);

        if (fileType === "image") {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function () {
            const blobUrl = URL.createObjectURL(file);

            setUploadingFile({
              type: fileType,
              src: blobUrl,
            });
          };
        } else {
          setUploadingFile({ type: fileType });
        }

        const response = await axios.post(
          BASE_URL + FILE_ROUTE,
          formData,
          config
        );
        setMedia((prevMedia) => [...prevMedia, response.data]);
        resetUploadState();
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "An error occurred. Please try again or contact @platle!"
        );
        resetUploadState();
      }
    },
    []
  );

  // Handle cropped image upload
  useEffect(() => {
    if (croppedImg && originalImg) {
      console.log(croppedImg, originalImg);

      const uploadCroppedImage = async () => {
        try {
          const index = media.findIndex(
            (item) => item.src === originalImg.split(FILES_URL2)[1]
          );

          if (index >= 0) {
            let updatedMedia = [...media];
            updatedMedia[index] = { ...media[index], processing: true };
            setMedia(updatedMedia);

            const responseBlob = await fetch(croppedImg).then((res) =>
              res.blob()
            );
            const fileExtension = originalImg
              .substring(originalImg.lastIndexOf(".") + 1)
              .toLowerCase();
            const filename = `croppedImage.${fileExtension}`;

            const formData = new FormData();
            formData.append("file", responseBlob, filename);

            const config = {
              headers: { Authorization: `Bearer ${user.token}` },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              },
              cancelToken: new CancelToken(
                (cancel) => (cancelFileUpload.current = cancel)
              ),
            };

            const response = await axios.post(
              BASE_URL + API_ENDPOINTS.UPLOAD_IMAGE,
              formData,
              config
            );
            updatedMedia[index] = response.data;
            setMedia(updatedMedia);
            resetUploadState();
            setOriginalImg(null);
            setAspectRatio(null);
            setCroppedImg(null);
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "An error occurred. Please try again or contact @platle!"
          );
          resetUploadState();
          setOriginalImg(null);
          setAspectRatio(null);
          setCroppedImg(null);
        }
      };
      uploadCroppedImage();
    }
  }, [croppedImg]);

  return {
    uploadingFile,
    setUploadingFile,
    uploadProgress,
    media,
    setMedia,
    cancelUpload,
    handleFileChange,
    setCroppedImg, // Expose setter for cropped image
    originalImg,
    setOriginalImg, // Expose setter for original image
    aspectRatio,
    setAspectRatio, // Expose setter for aspect ratio
  };
};

export default useFileUpload;
