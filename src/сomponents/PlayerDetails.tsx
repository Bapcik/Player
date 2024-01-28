export const PlayerDetails = (props: any) => {
  return (
    <div className="playerDetails">
      <h1 className="detailsTitle">{props.song.title}</h1>
      <h2 className="detailsArtist">{props.song.artist}</h2>
    </div>
  );
};
