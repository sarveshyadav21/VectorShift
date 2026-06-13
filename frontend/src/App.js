import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { PipelineModal } from './components/PipelineModal';
import { useStore } from './store';

function App() {
  const modalState = useStore((state) => state.modalState);
  const modalData = useStore((state) => state.modalData);
  const setModalState = useStore((state) => state.setModalState);

  return (
    <div className="app-container">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />

      {modalState && (
        <PipelineModal
          state={modalState}
          data={modalData}
          onClose={() => setModalState(null)}
        />
      )}
    </div>
  );
}

export default App;
