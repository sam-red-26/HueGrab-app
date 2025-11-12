import { useCameraPermissions, PermissionResponse } from 'expo-camera';

export interface CameraPermissionHook {
  permission: PermissionResponse | null;
  isGranted: boolean;
  canAskAgain: boolean;
  requestPermission: () => Promise<PermissionResponse>;
}

/**
 * Hook for managing camera permissions
 * @returns Camera permission state and request function
 */
export function useCameraPermission(): CameraPermissionHook {
  const [permission, requestPermission] = useCameraPermissions();

  return {
    permission,
    isGranted: permission?.granted ?? false,
    canAskAgain: permission?.canAskAgain ?? true,
    requestPermission,
  };
}
