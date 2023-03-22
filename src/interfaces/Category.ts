// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
// import CloseIcon from '@mui/icons-material/Close'
// import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
// import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined'
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
// import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
// import SquareIcon from '@mui/icons-material/Square'
// import GroupsIcon from '@mui/icons-material/Groups'
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
// import CodeIcon from '@mui/icons-material/Code'
// import CropIcon from '@mui/icons-material/Crop'
// import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
// import CircleIcon from '@mui/icons-material/Circle'
// import StarIcon from '@mui/icons-material/Star'
// import ReportProblemIcon from '@mui/icons-material/ReportProblem'
// import PaidIcon from '@mui/icons-material/Paid'
// import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
// import HexagonIcon from '@mui/icons-material/Hexagon'
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
// import FilterDramaIcon from '@mui/icons-material/FilterDrama'
// import InvertColorsIcon from '@mui/icons-material/InvertColors'
// import CropSquareIcon from '@mui/icons-material/CropSquare'
// import SpaIcon from '@mui/icons-material/Spa'
// import FavoriteIcon from '@mui/icons-material/Favorite'

import { icons } from '@/store/Icons'

// const icons = {
//   CircleOutlinedIcon,
//   CloseIcon,
//   HexagonOutlinedIcon,
//   SquareOutlinedIcon,
//   KeyboardArrowUpOutlinedIcon,
//   StarBorderOutlinedIcon,
//   SquareIcon,
//   GroupsIcon,
//   HorizontalRuleIcon,
//   CodeIcon,
//   CropIcon,
//   CloudOutlinedIcon,
//   CircleIcon,
//   StarIcon,
//   ReportProblemIcon,
//   PaidIcon,
//   HexagonIcon,
//   PanoramaFishEyeIcon,
//   CropSquareIcon,
//   SpaIcon,
//   FavoriteIcon,
//   ArrowDownwardIcon,
//   ArrowUpwardIcon,
//   FilterDramaIcon,
//   InvertColorsIcon
// }

export type Category = {
  category_id: number | null
  category_name: string
  admin_id: string
  icon: keyof typeof icons
  color: string
}
