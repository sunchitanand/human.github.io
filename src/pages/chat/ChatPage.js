import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import ChatTextField from './ChatTextField';
import ChatHistoryStack from './ChatHistoryStack';
// import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";

const ChatPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on the body element
    return () => {
      document.body.style.overflow = 'auto'; // Enable scrolling on unmount
    };
  }, []);

  const [chatHistory, setChatHistory] = useState([]);
  const b1Ref = useRef(null);

  const chat = new ChatOpenAI({ temperature: 0});

  // const handleSendMessage = (message) => {
  //   setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
  // };

  const handleSendMessage = async (message) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
  
    try {
      // const aiResponse = await model.call(
      //   message
      // );
      // console.log(aiResponse);

      const aiResponse = await chat.call([
        new HumanMessage(message),
      ]);      
      console.log("Responded: $aiResponse")

      // const aiResponse = response.data.aiResponse; // Adjust the response data structure as per your API response
  
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { message: message, aiResponse: aiResponse }
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  useEffect(() => {
    const b1Element = b1Ref.current;
    const b2Element = document.getElementById('section-b2');
    if (b1Element && b2Element) {
      const b1Height = b1Element.clientHeight;
      const b2TopOffset = b2Element.getBoundingClientRect().top;
      b1Element.style.maxHeight = `${b2TopOffset}px`;

      // Check if the content exceeds the height of Section B1
      if (b1Height < b1Element.scrollHeight) {
        b1Element.scrollTop = b1Element.scrollHeight - b1Element.clientHeight;
      }
    }
  }, [chatHistory]);

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={0} style={{ width: '100%', maxWidth: '1200px', height: '100%' }}>
        {/* Column A */}
        <Grid item xs={1} style={{ backgroundColor: 'white' }}>
          {/* Content for Column A */}
        </Grid>

        {/* Column B */}
        <Grid item xs={10} style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          {/* Section B1 */}
          <div
            style={{ backgroundColor: 'white', flex: 1, overflow: 'auto', position: 'relative', marginLeft: '6%'}}
            ref={b1Ref}
          >
            <ChatHistoryStack chatHistory={chatHistory} />
          </div>

          {/* Section B2 */}
          <Grid id="section-b2" item style={{ backgroundColor: 'white', flex: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, marginLeft: '20%', marginRight: '20%' }}>
            <ChatTextField onSend={handleSendMessage} />
          </Grid>
        </Grid>

        {/* Column C */}
        <Grid item xs={1} style={{ backgroundColor: 'white' }}>
          {/* Content for Column C */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
