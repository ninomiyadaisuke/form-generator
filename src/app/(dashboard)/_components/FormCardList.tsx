import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaEdit, FaWpforms } from 'react-icons/fa';
import { LuView } from 'react-icons/lu';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { GetForms } from '../_actions';


import LinkButton from './LinkButton';


const FormCardList = async () => {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard form={form} key={form.id} />
      ))}
    </>
  );
};

export default FormCardList;

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm text-muted-foreground">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm">{form.description || 'No description'}</CardContent>
      <CardFooter>
        {form.published && (
          <LinkButton className="text-md mt-2 w-full gap-4" href={`/forms/${form.id}`}>
            View submissions <BiRightArrowAlt />
          </LinkButton>
        )}
        {!form.published && (
          <LinkButton className="text-md mt-2 w-full gap-4" href={`/builder/${form.id}`} variant={'secondary'}>
            Edit form <FaEdit />
          </LinkButton>
        )}
      </CardFooter>
    </Card>
  );
};
