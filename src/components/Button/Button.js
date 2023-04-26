import { Button } from './Button.styled';

export default function ButtonLoadMore({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
}
