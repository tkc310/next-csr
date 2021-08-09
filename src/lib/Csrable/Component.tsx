import { FC } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Csrable: FC<Props> = (props) => {
  return <>{props.children}</>;
};

export default Csrable;
