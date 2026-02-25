import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { AvatarGroup } from "@/components/avatar-group"

const avatars = [
  {
    name: "Alex Rivera",
    src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Jamie Lee",
    src: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Taylor Kim",
    src: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Morgan Hill",
    src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Casey Park",
    src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
]

export const avatargroup_card = {
  header: "AvatarGroup",
  subText:
    "An AvatarGroup is a graphical representation of multiple people associated with a given entity.",
  cards: [
    {
      cardComponent: (
        <AvatarGroup>
          {avatars.slice(0, 4).map((avatar) => (
            <Avatar key={avatar.name} size="sm" name={avatar.name}>
              <AvatarImage src={avatar.src} />
              <AvatarFallback>{avatar.name}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Recommendations for grouping and overflow.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use stack layout for tight spaces, spread for emphasis.</li>
          <li>Show overflow when the count exceeds the available space.</li>
          <li>Provide names for tooltip or accessibility labels.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Layout",
      cardSubtext: "AvatarGroup can be represented in a spread, stack, or pie layout.",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <AvatarGroup layout="stack">
            {avatars.slice(0, 3).map((avatar) => (
              <Avatar key={avatar.name} size="sm" name={avatar.name}>
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.name}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <AvatarGroup layout="spread">
            {avatars.slice(0, 3).map((avatar) => (
              <Avatar key={avatar.name} size="sm" name={avatar.name}>
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.name}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <AvatarGroup layout="pie">
            {avatars.slice(0, 3).map((avatar) => (
              <Avatar key={avatar.name} size="sm" name={avatar.name}>
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.name}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      ),
    },
    {
      cardHeader: "Overflow",
      cardSubtext:
        "AvatarGroup can show an overflow indicator when there are too many items.",
      cardComponent: (
        <AvatarGroup max={3} overflowLabel={(count) => `+${count}`}
        >
          {avatars.map((avatar) => (
            <Avatar key={avatar.name} size="sm" name={avatar.name}>
              <AvatarImage src={avatar.src} />
              <AvatarFallback>{avatar.name}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      ),
    },
    {
      cardHeader: "Tooltip",
      cardSubtext: "AvatarGroup can show a tooltip per avatar.",
      cardComponent: (
        <AvatarGroup tooltip>
          {avatars.slice(0, 4).map((avatar) => (
            <Avatar key={avatar.name} size="sm" name={avatar.name}>
              <AvatarImage src={avatar.src} />
              <AvatarFallback>{avatar.name}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      ),
    },
  ],
}
