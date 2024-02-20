import { getFormById } from '../../builder/[id]/_actions';

async function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) {
    throw new Error('form not found');
  }

  return <div></div>;
}

export default FormDetailPage;
