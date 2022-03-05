/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
// import PropTypes from 'prop-types'
import Modal from '../../../UI/Modal';
import Row from './styles';
import Button from '../../../UI/Button';
import { deleteAnalysis } from '../../../../api/analysis';

export default function DeleteAnalysis({
  analysisId,
  analyses,
  setAnalyses,
  toast,
}) {
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  const deleteAnalysisFromList = () => {
    const filtered = analyses.filter((analysis) => analysis._id !== analysisId);
    setAnalyses(filtered);
  };

  const handleDeleteAnalysis = async () => {
    await deleteAnalysis(analysisId).then(() => {
      hideModal();
      deleteAnalysisFromList();
      toast.error('Analysis removed');
    });
  };

  return (
    <>
      <button type="button" className="options-buttons" onClick={showModal}>
        <MdDelete />
      </button>

      <Modal header="Delete Analysis" show={modal} handleClose={hideModal}>
        <p>Are you sure that you want to perform this action?</p>
        <Row>
          <Button type="button" onClick={hideModal}>
            Cancel
          </Button>
          <Button type="button" onClick={() => handleDeleteAnalysis()}>
            Confirm
          </Button>
        </Row>
      </Modal>
    </>
  );
}

// DeleteAnalysis.propTypes = {
//   analysis: PropTypes.string.isRequired,
//   deleteAnalysisFromList: PropTypes.func.isRequired,
//   toast: PropTypes.func,
// }
