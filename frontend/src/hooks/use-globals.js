import { computed } from '@vue/composition-api';
import store        from '@/store/store';
import moment       from 'moment';

export const useGlobals = () => {

  const calculateDifference = (dateStart, dateEnd) => {
    const start = moment(dateStart);
    const end = moment(dateEnd);

    const difference = moment.preciseDiff(start, end, true);
    if (difference.days >= 25) {
      difference.days = 0;
      difference.months += 1;
    }

    let timeFrame = '';

    if (difference.years === 1) timeFrame += difference.years.toString() + ' Year ';
    if (difference.years > 1) timeFrame += difference.years.toString() + ' Years ';
    if (difference.months === 1) timeFrame += difference.months.toString() + ' Month';
    if (difference.months > 1) timeFrame += difference.months.toString() + ' Months';
    return timeFrame;
  };

  const dateYYYYMM = (item) => {
    return moment(new Date(item)).format('YYYY-MM');
  };

  const dateYYYY = (item) => {
    return moment(new Date(item)).format('YYYY');
  };

  const getWorkstation = () => {
    store.dispatch('getWorkstations');
  };

  const getItTechnologies = () => {
    store.dispatch('getItTechnologies');
  };

  const getProjects = () => {
    store.dispatch('employeesModule/getProjects');
  };

  const getLevelList = () => {
    store.dispatch('getLevelList');
  };

  const getLevelDetailList = () => {
    store.dispatch('getLevelDetailList');
  };

  const getLanguages = () => {
    store.dispatch('getLanguages');
  };

  const getLanguageWithoutLevel = () => {
    store.dispatch('getLanguagesWithoutLevel');
  };

  const getWorkstationDetail = () => {
    store.dispatch('getWorkstationDetail');
  };

  const levelList = computed(() => store.state.global.levelList);
  const languages = computed(() => store.state.global.languages);
  const professions = computed(() => store.state.global.professions);
  const projects = computed(() => store.state.employeesModule.projects);
  const itTechnologies = computed(() => store.state.global.itTechnologies);
  const levelDetailList = computed(() => store.state.global.levelDetailList);
  const workstationDetail = computed(() => store.state.global.workstationDetail);
  const languagesWithoutLevel = computed(() => store.state.global.languagesWithoutLevel);

  return {
    dateYYYY,
    projects,
    levelList,
    languages,
    dateYYYYMM,
    professions,
    getProjects,
    getLanguages,
    getLevelList,
    itTechnologies,
    getWorkstation,
    levelDetailList,
    getItTechnologies,
    workstationDetail,
    getLevelDetailList,
    calculateDifference,
    getWorkstationDetail,
    languagesWithoutLevel,
    getLanguageWithoutLevel,
  };
};