import { faGripLines } from '@fortawesome/free-solid-svg-icons/faGripLines';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import { library } from '@fortawesome/fontawesome-svg-core';

const loadIcons = (): void => {
  library.add(faGripLines, faTrash);
};

export default loadIcons;
