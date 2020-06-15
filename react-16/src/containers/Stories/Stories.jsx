import React, { useState } from "react";

import Story from "../../components/Story";

import "./Stories.scss";

const Stories = ({ stories, getUserHandler }) => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <React.Fragment>
      <section className="stories" data-testid="stories">
        <nav className="container">
          {stories

            .filter(({ userId }) => {
              const user = getUserHandler(userId);

              return user?.id === userId;
            })

            .map((story, id) => {
              const user = getUserHandler(story.userId);

              return (
                <button
                  key={`story-${story.id}`}
                  onClick={() => setSelectedStory({story, user})}
                  className={`user__thumb ${
                    id === 0 && "user__thumb--hasNew"
                  }`}
                >
                  <div className="user__thumb__wrapper">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                </button>
              );
            })}
        </nav>
      </section>

      {selectedStory && (
        <Story
          story={selectedStory.story}
          user={selectedStory.user}
          handleClose={() => setSelectedStory(null)}
        />
      )}
    </React.Fragment>
  );
};

export default Stories;

// const Stories = ({ stories, getUserHandler }) => {
//   const [showStory, toggleShowStory] = useState(false);
//   const [selectedStory, setSelectedHistory] = useState({});
//   const [selectedProfile, setSelectedProfile] = useState({});

//   const findStoryById = (id) => stories.find(story => story.id === id);

//   const handleStory = (story) => {
//     const foundStory = findStoryById(story.id);
//     const profileData = getUserHandler(story.userId);

//     setSelectedProfile(profileData);
//     setSelectedHistory(foundStory);
//     toggleShowStory(!showStory);
//   };

//   return (
//     <React.Fragment>
//       <section className="stories" data-testid="stories">
//         <div className="container">
//           {stories.map((story, index) => {
//             const profileData = getUserHandler(story.userId);

//             return (
//               <button
//                 key={story.id}
//                 onClick={() => handleStory(story)}
 //                 className={`user__thumb ${index === 0 && 'user__thumb--hasNew'}`}
 //               >
 //                 <div className="user__thumb__wrapper">
 //                   <img src={profileData.avatar} alt={profileData.name} />
 //                 </div>
 //               </button>
 //             )})
 //           }
 //         </div>
 //       </section>
 
 //       {showStory && (
 //         <Story
 //           story={selectedStory}
//           user={selectedProfile}
//           handleClose={() => toggleShowStory(!showStory)}
//         />
//         )}
//     </React.Fragment>
//   );
// };
// export default Stories;
