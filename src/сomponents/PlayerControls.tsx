export const PlayerControls = (props: any) => {
  return (
    <div className="playerControls">
      <button
        className="customButton button"
        onClick={() => props.skipSong(false)}
      >
        Back
      </button>
      <button
        className="customButton button"
        onClick={() => props.setPlaying(true)}
      >
        Play
      </button>
      <button
        className="customButton button"
        onClick={() => props.setPlaying(false)}
      >
        Pause
      </button>
      <button
        className="customButton button"
        onClick={() => props.skipSong(true)}
      >
        Next
      </button>
    </div>
  );
};
