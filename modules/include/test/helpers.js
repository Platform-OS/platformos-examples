import { Selector } from 'testcafe';

const getResult = async name => await Selector(`[data-result="${name}"]`).textContent;

export { getResult };
