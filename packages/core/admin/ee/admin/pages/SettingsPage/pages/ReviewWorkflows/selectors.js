import isEqual from 'lodash/isEqual';
import { createSelector } from 'reselect';

import { REDUX_NAMESPACE } from './constants';
import { initialState } from './reducer';

// TODO: this is bad
export const selectNamespace = (state) =>
  state[REDUX_NAMESPACE] ?? state?.['0'][REDUX_NAMESPACE] ?? initialState;

export const selectContentTypes = createSelector(
  selectNamespace,
  ({ serverState: { contentTypes } }) => contentTypes
);

export const selectCurrentWorkflow = createSelector(
  selectNamespace,
  ({ clientState: { currentWorkflow } }) => currentWorkflow.data
);

export const selectWorkflows = createSelector(
  selectNamespace,
  ({ serverState: { workflows } }) => workflows
);

export const selectIsWorkflowDirty = createSelector(
  selectNamespace,
  ({ serverState, clientState: { currentWorkflow } }) =>
    !isEqual(serverState.workflow, currentWorkflow.data)
);

export const selectHasDeletedServerStages = createSelector(
  selectNamespace,
  ({ serverState, clientState: { currentWorkflow } }) =>
    !(serverState.workflow?.stages ?? []).every(
      (stage) => !!currentWorkflow.data.stages.find(({ id }) => id === stage.id)
    )
);

export const selectIsLoading = createSelector(
  selectNamespace,
  ({ clientState: { isLoading } }) => isLoading
);

export const selectServerState = createSelector(selectNamespace, ({ serverState }) => serverState);
