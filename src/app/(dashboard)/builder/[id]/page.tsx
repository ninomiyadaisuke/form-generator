import { getFormById } from './_actions';

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await getFormById(Number(id));

  if (!form) throw new Error('form not found');
  return <div>{form.id}</div>;
}

export default BuilderPage;
