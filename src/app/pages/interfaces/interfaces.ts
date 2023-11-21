export interface RespuestaTopHeadlines {
  data: Feriado[];
}

export interface Feriado {
  date: string;
  title: string;
  type: string;
  inalienable: boolean;
  extra: string;
}