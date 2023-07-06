import React, { useState, useRef } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";

const RecordingStudents = () => {
  const [active, setActive] = useState("addRawKey");
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const theme = useTheme();

  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  let chunks = [];

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            setRecordings((prevRecordings) => [
              ...prevRecordings,
              { id: Date.now(), audioURL },
            ]);
          };

          mediaRecorder.start();
          setRecording(true);
        })
        .catch((error) => {
          console.log("Following error has occurred: ", error);
        });
    } else {
      console.log("Your browser does not support mediaDevices");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const deleteRecording = (id) => {
    setRecordings((prevRecordings) =>
      prevRecordings.filter((recording) => recording.id !== id)
    );
  };

  const clearRecordings = () => {
    setRecordings([]);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      
        {active === "addRawKey" && <Header title="Student Recordings" />}
       
        <Box>
          
          <Button
            onClick={() => setActive("addRawKey")}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Edit sx={{ mr: "10px" }} />
            Student Recordings
          </Button>
         
        </Box>
      </FlexBetween>

     

      {active === "addRawKey" && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            my="20px"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <div>
              <h1>Recording Students</h1>
              {!recording && (
                <button onClick={startRecording}>Start Recording</button>
              )}
              {recording && (
                <button onClick={stopRecording}>Stop Recording</button>
              )}
              {recordings.length > 0 && (
                <div>
                  {recordings.map((recording) => (
                    <div key={recording.id}>
                      <ReactAudioPlayer src={recording.audioURL} controls />
                      <Button
                        variant="contained"
                        onClick={() => deleteRecording(recording.id)}
                        style={{ marginTop: "6rem" }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    onClick={clearRecordings}
                    style={{ marginTop: "8rem" }}
                  >
                    Clear Recordings
                  </Button>
                </div>
              )}
            </div>
          </Box>
        </Box>
      )}

      
    </Box>
  );
};

export default RecordingStudents;
