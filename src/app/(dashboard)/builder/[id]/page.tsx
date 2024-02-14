import { getFormById } from './_actions';
import FormBuilder from './_components/FormBuilder';

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await getFormById(Number(id));

  if (!form) throw new Error('form not found');
  return <FormBuilder form={form} />;
}

export default BuilderPage;
