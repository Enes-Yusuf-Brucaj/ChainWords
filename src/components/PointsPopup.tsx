type PointsPopupProps = {
  points: number;
  x: number;
  y: number;
  show: boolean;
};

const PointsPopup: React.FC<PointsPopupProps> = ({ points, x, y, show }) => {
  if (!show) return null;

  return (
    <div className="points-popup" style={{ top: y, left: x }}>
      +{points}
    </div>
  );
};

export default PointsPopup;
