import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import SquareIcon from '@mui/icons-material/Square'
import GroupsIcon from '@mui/icons-material/Groups'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import CodeIcon from '@mui/icons-material/Code'
import CropIcon from '@mui/icons-material/Crop'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'

const icons = {
  CircleOutlinedIcon,
  CloseIcon,
  HexagonOutlinedIcon,
  SquareOutlinedIcon,
  KeyboardArrowUpOutlinedIcon,
  StarBorderOutlinedIcon,
  SquareIcon,
  GroupsIcon,
  HorizontalRuleIcon,
  CodeIcon,
  CropIcon,
  CloudOutlinedIcon
}

export type Category = {
  category_id: number | null
  category_name: string
  admin_id: string
  icon: keyof typeof icons
  color: string
}
