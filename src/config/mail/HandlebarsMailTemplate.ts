import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const paseTemplate = handlebars.compile(template);

    return paseTemplate(variables);
  }
}
