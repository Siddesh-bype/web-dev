import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const fetcher = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await response.json()
    error.status = response.status
    throw error
  }
  return response.json()
}

export function useWorkflows() {
  const { data, error, isLoading, mutate } = useSWR('/api/workflows', fetcher)
  
  return {
    workflows: data || [],
    isLoading,
    error,
    mutate,
  }
}

export function useWorkflow(id) {
  const { data, error, isLoading, mutate } = useSWR(`/api/workflows/${id}`, fetcher)
  
  return {
    workflow: data || null,
    isLoading,
    error,
    mutate,
  }
}

export function useIntegrations() {
  const { data, error, isLoading } = useSWR('/api/integrations', fetcher)
  
  return {
    integrations: data || [],
    isLoading,
    error,
  }
}

export function useApiStats() {
  const { data, error, isLoading } = useSWR('/api/stats', fetcher)
  
  return {
    stats: data || null,
    isLoading,
    error,
  }
}

export function useCreateWorkflow() {
  const { trigger, isMutating, error } = useSWRMutation('/api/workflows', (url, { arg }) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    }).then(res => res.json())
  )

  return {
    createWorkflow: trigger,
    isCreating: isMutating,
    error,
  }
}

export function useUpdateWorkflow() {
  const { trigger, isMutating, error } = useSWRMutation('/api/workflows', (url, { arg }) =>
    fetch(`${url}/${arg.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    }).then(res => res.json())
  )

  return {
    updateWorkflow: trigger,
    isUpdating: isMutating,
    error,
  }
}

export function useDeleteWorkflow() {
  const { trigger, isMutating, error } = useSWRMutation('/api/workflows', (url, { arg }) =>
    fetch(`${url}/${arg}`, {
      method: 'DELETE',
    }).then(res => res.json())
  )

  return {
    deleteWorkflow: trigger,
    isDeleting: isMutating,
    error,
  }
}

export function useDeployWorkflow() {
  const { trigger, isMutating, error } = useSWRMutation('/api/workflows', (url, { arg }) =>
    fetch(`${url}/${arg.id}/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  )

  return {
    deployWorkflow: trigger,
    isDeploying: isMutating,
    error,
  }
}
