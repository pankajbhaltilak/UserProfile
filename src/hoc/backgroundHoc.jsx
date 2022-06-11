export const backgroundHoc = (Component, color = '#ddd') => {
  const styleObj = {
    border: '2px solid black',
    display: 'inline-block',
    padding: '20px',
    margin: '20px',
    backgroundColor: color,
  };

  return (props) => {
    return (
      <div style={styleObj}>
        <Component {...props} />
      </div>
    );
  };
};
