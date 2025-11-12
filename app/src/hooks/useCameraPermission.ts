import { Camera, CameraPermissionResponse } from 'expo-camera';

export interface CameraPermissionHook {
  permission: CameraPermissionResponse | null;
  isGranted: boolean;
  canAskAgain: boolean;
  requestPermission: () => Promise<CameraPermissionResponse>;
}

/**
 * Hook for managing camera permissions
 * @returns Camera permission state and request function
 */
export function useCameraPermission(): CameraPermissionHook {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  return {
    permission,
    isGranted: permission?.granted ?? false,
    canAskAgain: permission?.canAskAgain ?? true,
    requestPermission,
  };
}
