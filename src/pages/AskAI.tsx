import { useRef, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import robotAnimation from "../assets/robot.json";
import { useLottie } from "lottie-react";
import { motion } from "framer-motion";
import { Configuration, OpenAIApi } from "openai";

export const AskAI = () => {
  const options = ["Movie", "TV Show"];
  const lottieOptions = {
    animationData: robotAnimation,
    loop: false,
    speed: 0.2,
    autoplay: true,
    style: {
      width: "300px",
      height: "300px",
      margin: "auto",
      display: "block",
      minWidth: "300px",
      minHeight: "300px",
      justifyContent: "center",
    },
  };
  //
  // Route Protection
  //
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/Login");
      } else {
        return;
      }
    });
  }, [navigate]);

  //
  // OpenAI API, configuration
  //
  const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY as string;
  const config = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(config);
  const { View } = useLottie(lottieOptions);
  const reqRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [aiOption, setAiOption] = useState(options[0]);
  const [aiResponse, setAiResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleAskAI = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsVisible(true);
    setLoading(true);
    if (prompt === "") {
      setIsError(true);
      return;
    }
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
          "Give me a single movie or tvshow to watch if I like the " +
          aiOption +
          prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      console.log("response", result.data.choices[0].text);
      setAiResponse(result.data.choices[0].text as string);
    } catch (e) {
      console.log(e);
      setAiResponse("Error");
    }
    setLoading(false);
  };
  return (
    <main className="hero m-auto max-w-xl pl-5 pr-5">
      <div className="card w-auto bg-base shadow-md shadow-stone-800">
        <div className="card-body">
          <div className="form-control">
            <h1 className="text-4xl p-4 text-center font-bold from-red-600 via-orange-500 to-pink-600 bg-gradient-to-r bg-clip-text text-transparent ">
              Ask AI for a Suggestion
            </h1>
            <p className="text-md pb-3">
              Choose whether you want to get a movie or show suggestion from AI.
              Then, enter a title and click "Ask AI" to get a suggestion.
            </p>
            <label className="mb-2 m-auto font-bold">Movie or Show?</label>
            <select
              className="select select-accent w-full max-w-sm m-auto mb-3"
              value={aiOption}
              onChange={(e) => {
                setAiOption(e.target.value);
              }}
            >
              {options.map((value) => (
                <>
                  <option value={value} key="1">
                    {value}
                  </option>

                  <option value={value} key="2">
                    {value}
                  </option>
                </>
              ))}
            </select>
            <input
              type="text"
              ref={reqRef}
              placeholder="Enter Title"
              className="input input-bordered w-full h-9 max-w-sm m-auto mb-0"
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              className="btn-block btn btn-sm max-w-sm mt-3 w-70 m-auto btn-secondary rounded-md"
              onClick={handleAskAI}
            >
              {loading ? "Generating suggestion..." : "Ask AI"}
            </button>
            <motion.div
              animate={{ scale: [0, 1.5, 0.8] }}
              transition={{ delay: 2 }}
              className={`${isVisible ? "" : "hidden"}`}
            >
              {View}
            </motion.div>
            <div
              className={`alert max-h-13 bg-error ${isError ? "" : "hidden"}`}
            >
              <span className="flex-col justify-start ">
                <p>You must give a movie or tv show title.</p>
                <br />
              </span>
              <label onClick={() => setIsError(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="flex-col w-6 h-6 justify-self-end m-auto inline align-top hover:text-black cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </label>
            </div>
            {aiResponse && (
              <>
                <motion.div className="chat chat-start justify-center">
                  <div className="chat-bubble">
                    Hey ScreenGenie, can you give me a suggestion if I liked the{" "}
                    {aiOption} {prompt}?
                  </div>
                </motion.div>
                <motion.div className="chat chat-end">
                  <div className="chat-bubble">{aiResponse}</div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
