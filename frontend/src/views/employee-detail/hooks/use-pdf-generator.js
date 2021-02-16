import { computed } from '@vue/composition-api';
import store        from '@/store/store';
import html2canvas  from 'html2canvas';
import JsPDF        from 'jspdf';

export const usePdfGenerator = () => {

  const name = computed(() => store.state.employeeDetailModule.profile.name);
  const lastName = computed(() => store.state.employeeDetailModule.profile.lastName);
  const pdfModal = computed(() => store.state.employeeDetailModule.pdfModal);
  const pdfModalLoading = computed(() => store.state.employeeDetailModule.pdfModalLoading);
  const pdfSettings = computed(() => store.state.employeeDetailModule.pdfSettings);

  const closePdfModal = () => {
    store.commit('employeeDetailModule/setPdfModal', false);
    store.commit('employeeDetailModule/setPdfSettings', {
      blind: false,
      showEducation: true,
      shoeEducationDescription: true,
      showCertificate: true,
      showDescriptionProject: true,
      showTopicProject: true,
    });
  };

  const openPdfModal = () => {
    store.commit('employeeDetailModule/setPdfModal', true);
  };

  const generateCv = () => {
    store.commit('employeeDetailModule/setPdfModalLoading', true);

    const divHeight = document.getElementById('profile').offsetHeight;
    const divWidth = document.getElementById('profile').offsetWidth;

    html2canvas(document.getElementById('profile'), {
      scale: 2,
      height: divHeight,
    }).then((canvas) => {
      let img = canvas.toDataURL('image/jpg', 2);
      let pdf = new JsPDF({ unit: 'px', format: [ divWidth / 2, divHeight / 2 ] });
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (pdf).getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(img, 'JPEG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'MEDIUM');

      pdf.save(`${name.value}_${lastName.value}.pdf`);
      store.commit('employeeDetailModule/setPdfModalLoading', false);
    });
  };

  return {
    pdfModal,
    generateCv,
    pdfSettings,
    openPdfModal,
    closePdfModal,
    pdfModalLoading,
  };
};