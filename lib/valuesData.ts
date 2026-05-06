export type ValueCard = {
  id: string;
  name: string;
  description: string;
  action: string;
  category: string;
};

export const ALL_VALUES: ValueCard[] = [
  // 1. NHÓM PHẨM CHẤT & ĐẠO ĐỨC
  { id: 'v1', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Chính trực', description: 'Sống ngay thẳng', action: 'Nói "không" với một việc mà bạn thấy đi ngược lại nguyên tắc của mình.' },
  { id: 'v2', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Trung thực', description: 'Không gian dối', action: 'Chia sẻ một sự thật mà bạn từng giấu kín với người bạn tin cậy.' },
  { id: 'v3', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Trách nhiệm', description: 'Dám làm dám chịu', action: 'Chủ động nhận lỗi về một thiếu sót nhỏ trong hôm nay và tìm cách khắc phục.' },
  { id: 'v4', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Dũng cảm', description: 'Vượt qua nỗi sợ', action: 'Thực hiện một việc nhỏ mà bạn luôn chần chừ vì sợ hãi.' },
  { id: 'v5', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Khiêm tốn', description: 'Biết mình biết ta', action: 'Chăm chú lắng nghe thay vì ngắt lời khi người khác đang nói.' },
  { id: 'v6', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Kỷ luật', description: 'Kiểm soát bản thân', action: 'Hoàn thành một thói quen nhỏ bạn thường hay bỏ lỡ, như dọn giường.' },
  { id: 'v7', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Công bằng', description: 'Đứng về lẽ phải', action: 'Lên tiếng bảo vệ hoặc ủng hộ một người trong một cuộc thảo luận.' },
  { id: 'v8', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Kiên trì', description: 'Không bỏ cuộc', action: 'Tiếp tục thực hiện một nhiệm vụ dở dang thêm 15 phút nữa.' },
  { id: 'v9', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Chân thành', description: 'Sống thật tâm', action: 'Bày tỏ cảm xúc thực sự của mình trong một tình huống khó.' },
  { id: 'v10', category: 'PHẨM CHẤT & ĐẠO ĐỨC', name: 'Tận tâm', description: 'Hết lòng với việc làm', action: 'Rà soát lại công việc đang làm để tăng thêm sự chỉn chu.' },

  // 2. NHÓM CẢM XÚC & TINH THẦN
  { id: 'v11', category: 'CẢM XÚC & TINH THẦN', name: 'Hạnh phúc', description: 'Niềm vui nội tại', action: 'Dành 15 phút làm một việc bạn thực sự thích.' },
  { id: 'v12', category: 'CẢM XÚC & TINH THẦN', name: 'Bình an', description: 'Sự thanh thản', action: 'Ngồi tĩnh lặng tập trung vào hơi thở trong 5 phút.' },
  { id: 'v13', category: 'CẢM XÚC & TINH THẦN', name: 'Tự do', description: 'Tự chủ cuộc đời', action: 'Thiết kế thời gian biểu trong một buổi của bạn theo đúng ý muốn.' },
  { id: 'v14', category: 'CẢM XÚC & TINH THẦN', name: 'Lạc quan', description: 'Nhìn vào mặt tích cực', action: 'Rút ra bài học tích cực từ một trải nghiệm khó khăn gần đây.' },
  { id: 'v15', category: 'CẢM XÚC & TINH THẦN', name: 'Đam mê', description: 'Sự nhiệt huyết cháy bỏng', action: 'Dành ít nhất 30 phút cho sở thích cá nhân của bạn.' },
  { id: 'v16', category: 'CẢM XÚC & TINH THẦN', name: 'Hài hước', description: 'Mang lại tiếng cười', action: 'Xem một video cười hoặc kể một câu chuyện vui cho ai đó.' },
  { id: 'v17', category: 'CẢM XÚC & TINH THẦN', name: 'Biết ơn', description: 'Trân trọng điều đang có', action: 'Viết ra 3 điều nhỏ bé hôm nay mà bạn cảm thấy biết ơn.' },
  { id: 'v18', category: 'CẢM XÚC & TINH THẦN', name: 'Độc lập', description: 'Tự đứng trên đôi chân', action: 'Tự giải quyết một vấn đề nhỏ mà bạn hay nhờ người khác.' },
  { id: 'v19', category: 'CẢM XÚC & TINH THẦN', name: 'Cân bằng', description: 'Giữa công việc & cuộc sống', action: 'Tắt màn hình thiết bị và nghỉ ngơi khi kết thúc giờ làm.' },
  { id: 'v20', category: 'CẢM XÚC & TINH THẦN', name: 'Tâm linh/Đức tin', description: 'Niềm tin vào vũ trụ/tôn giáo', action: 'Dành 10 phút cầu nguyện hay thiền định hướng vào nội tâm.' },

  // 3. NHÓM TRÍ TUỆ & PHÁT TRIỂN
  { id: 'v21', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Học hỏi', description: 'Cầu tiến, ham học', action: 'Đọc tài liệu mới hoặc học một kỹ năng mới trong 20 phút.' },
  { id: 'v22', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Sáng tạo', description: 'Tư duy đổi mới', action: 'Thử làm một việc hàng ngày theo một phong cách hoàn toàn mới.' },
  { id: 'v23', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Thông thái', description: 'Sự hiểu biết sâu sắc', action: 'Đọc 10 trang của một cuốn sách chuyên ngành.' },
  { id: 'v24', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Xuất sắc', description: 'Làm tốt nhất có thể', action: 'Cải tiến một phần việc hiện tại để khiến nó tốt hơn mong đợi.' },
  { id: 'v25', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Thành công', description: 'Đạt được thành tựu', action: 'Viết ra 3 mục tiêu cho hôm nay và nỗ lực hoàn thiện.' },
  { id: 'v26', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Hiệu quả', description: 'Làm việc thông minh', action: 'Sắp xếp lại các bước thực hiện công việc để tiết kiệm thời gian.' },
  { id: 'v27', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Lãnh đạo', description: 'Dẫn dắt, gây ảnh hưởng', action: 'Chủ động dẫn dắt và đưa ra giải pháp trong một cuộc họp nhóm.' },
  { id: 'v28', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Tầm nhìn', description: 'Nhìn xa trông rộng', action: 'Phác thảo những mục tiêu dài hạn 5 năm của bạn vào sổ.' },
  { id: 'v29', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Mạo hiểm', description: 'Dám thử thách mới', action: 'Bước ra khỏi vùng an toàn để xin thêm việc hoặc nhận dự án mới.' },
  { id: 'v30', category: 'TRÍ TUỆ & PHÁT TRIỂN', name: 'Linh hoạt', description: 'Thích nghi nhanh', action: 'Chấp nhận thay đổi một kế hoạch một cách êm ái mà không bực dọc.' },

  // 4. NHÓM KẾT NỐI & YÊU THƯƠNG
  { id: 'v31', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Yêu thương', description: 'Trao và nhận tình cảm', action: 'Gửi một tin nhắn nói lời yêu thương tới ai đó thân thiết.' },
  { id: 'v32', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Gia đình', description: 'Ưu tiên người thân', action: 'Dành 30 phút trọn vẹn ở bên gia đình không dùng điện thoại.' },
  { id: 'v33', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Tình bạn', description: 'Sự gắn kết đồng trang lứa', action: 'Hỏi thăm một người bạn cũ đã lâu không liên lạc.' },
  { id: 'v34', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Đồng cảm', description: 'Thấu hiểu người khác', action: 'Diễn đạt lại cảm xúc của người đối diện để thấy bạn đồng cảm.' },
  { id: 'v35', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Lòng trắc ẩn', description: 'Muốn giúp đỡ người khác', action: 'Giúp một đồng nghiệp hoặc người trên đường một việc nhỏ lành tính.' },
  { id: 'v36', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Tôn trọng', description: 'Kính trọng mọi người', action: 'Hỏi ý kiến của ai đó đang e dè và tôn trọng góc nhìn của họ.' },
  { id: 'v37', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Tha thứ', description: 'Buông bỏ oán giận', action: 'Nhắc nhở bản thân để bao dung cho một lỗi nhỏ của ai đó hôm nay.' },
  { id: 'v38', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Hợp tác', description: 'Làm việc cùng nhau', action: 'Đề xuất giúp đỡ một thành viên trong nhóm công việc chung.' },
  { id: 'v39', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Trung thành', description: 'Gắn bó keo sơn', action: 'Ủng hộ tổ chức/cộng đồng bạn đang tham gia bằng một việc cụ thể.' },
  { id: 'v40', category: 'KẾT NỐI & YÊU THƯƠNG', name: 'Rộng lượng', description: 'Sẵn sàng cho đi', action: 'Tặng hoặc chia sẻ một món đồ mọn với một người bạn thích.' },

  // 5. NHÓM PHONG CÁCH SỐNG & THỰC TẾ
  { id: 'v41', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Sức khỏe', description: 'Thể chất tráng kiện', action: 'Vận động 15 phút hoặc chọn thực phẩm lành mạnh cho bữa tới.' },
  { id: 'v42', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Giàu có/Thịnh vượng', description: 'Tài chính vững vàng', action: 'Nghiên cứu hoặc ghi lại dòng tiền để tối ưu tài chính tháng tới.' },
  { id: 'v43', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'An toàn', description: 'Sự ổn định, bảo vệ', action: 'Rà soát khoá cửa bảo mật nhà ở hoặc chuẩn bị trước rủi ro hợp đồng.' },
  { id: 'v44', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Đơn giản', description: 'Sống tối giản, thanh đạm', action: 'Khử bớt hoặc đem cho những vật dụng dư thừa xung quanh bạn.' },
  { id: 'v45', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Thẩm mỹ', description: 'Yêu cái đẹp, nghệ thuật', action: 'Thưởng thức âm nhạc hoặc sắp xếp nhà bạn cho đẹp hơn.' },
  { id: 'v46', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Sự công nhận', description: 'Được người khác ghi nhận', action: 'Lên tiếng về một thành quả tốt mà bạn vừa mới hoàn thành.' },
  { id: 'v47', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Trật tự', description: 'Sự ngăn nắp, quy củ', action: 'Dọn sạch bàn tay, túi và màn hình máy tính của bạn.' },
  { id: 'v48', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Cống hiến', description: 'Phụng sự cộng đồng', action: 'Quyên góp một khoản nhỏ hoặc chia sẻ năng lực cho dự án vì xã hội.' },
  { id: 'v49', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Sự nổi tiếng', description: 'Được nhiều người biết đến', action: 'Chia sẻ một trải nghiệm tích cực lên mạng xã hội để tăng kết nối.' },
  { id: 'v50', category: 'PHONG CÁCH SỐNG & THỰC TẾ', name: 'Sự tinh tế', description: 'Nhạy bén, sâu sắc', action: 'Quan sát để ý ngầm giúp đỡ một ai đó mà họ chưa cần yêu cầu.' }
];
