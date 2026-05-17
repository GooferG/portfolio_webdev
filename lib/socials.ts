import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/ui/SocialIcons'
import type { ComponentType } from 'react'

export type Social = {
  label: string
  href: string
  display: string
  icon: ComponentType<{ size?: number; className?: string }>
}

export const SOCIALS: Social[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/GooferG',
    display: 'github.com/GooferG',
    icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lmeneghim/',
    display: 'linkedin.com/in/lmeneghim',
    icon: LinkedInIcon,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/Goofer_G',
    display: 'x.com/Goofer_G',
    icon: XIcon,
  },
]
