type TProps = {
  children: JSX.Element | JSX.Element[];
};

const Csrable = (props: TProps) => {
  return <>{props.children}</>;
};

export default Csrable;
