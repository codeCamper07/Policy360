'use client'
import { CldUploadWidget } from 'next-cloudinary'
import { Edit2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const DisplayPicture = ({ className }: { className: string }) => {
  return (
    <CldUploadWidget
      uploadPreset='policy360'
      onSuccess={async (result, { widget }) => {
        if (typeof result.info !== 'string') {
          await authClient.updateUser({
            image: `${result?.info?.secure_url}`,
          })
        }
        widget.close()
      }}>
      {({ open }) => {
        return (
          <div className={className} onClick={() => open()}>
            <Edit2 />
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default DisplayPicture
