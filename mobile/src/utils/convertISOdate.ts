import { format, parseISO } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

export const convertISOdate = (date: string) =>
  format(new Date(date), "dd' de 'MMMM' de 'yyyy' às 'HH:mm'h'", { locale: ptBr })
