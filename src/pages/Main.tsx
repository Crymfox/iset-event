import { useContext, useState } from "react"
import Card from "../components/Card.tsx"
import Creator from "../components/Creator.tsx";
import { TeamsContext } from "../contexts/Teams.tsx";
import { useHotkeys } from "react-hotkeys-hook";
import { AnimatePresence, motion } from "framer-motion";

const Main = () => {

  const { teams, setTeams, sortTeams, deleteTeam } = useContext(TeamsContext);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // set the score of the card at the given index
    const newTeams = [...teams]
    newTeams[index].score = Number(event.target.value)
    setTeams(newTeams)
  }

  const handleOnBlur = () => {
    // sort the teams based on the score
    const sortedTeams = sortTeams!(teams)
    setTeams(sortedTeams)
  }

  const [visible, setVisible] = useState(true)

  useHotkeys('ctrl+enter', () => {
    setVisible(!visible)
  }, {enableOnFormTags: ["input"]})

  return (
    <>
    <img className="absolute top-0 h-full w-full opacity-70" src="/wallpaper.jpg" />
    <div className="mx-4 relative">
      <h1 className="text-4xl text-white font-bold text-center my-2">Scoreboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {teams.map((card, index) => {
            return <motion.div
              key={card.id}
              // smooth animation when sorting
              layout
              initial={{ opacity: 0}}
              animate={{ opacity: 1, transition: { duration: 0.5 }}}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: 'tween'}}
            >
              <Card
                // key={index}
                imageSrc={card.imageSrc}
                title={card.title}
                score={card.score!}
                onChangeFunction={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event, index)}
                rank={index + 1}
                onBlurFunction={() => handleOnBlur()}
                onDeleteFunction={() => deleteTeam!(card)}
              />
            </motion.div>
          })}
        </AnimatePresence>
        {visible && <Creator />}
      </div>
    </div>
    </>
  )
}

export default Main