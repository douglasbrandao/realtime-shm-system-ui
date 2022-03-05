import * as Yup from 'yup';

const MetricSchema = Yup.object().shape({
  analysis: Yup.string().required('Analysis is required'),
  realtime: Yup.boolean(),
});

export default MetricSchema;
