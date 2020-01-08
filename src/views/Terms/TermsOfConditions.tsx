import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid';
import GridContainer from '@/layouts/Grid/Container';
import Logo from '@/components/ToolBar/Logo';
interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
	logoMain: {
		width:'100%',
		marginTop:'25px',
		marginBottom:'40px',
		textAlign: 'center',
	},
});

// @ts-ignore
const TermsOfConditions: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  return (
    <Fragment>
    	<GridContainer xs = {9}>
         <Grid container>
         	<div className={classes.logoMain}>
         		<Logo />
         	</div>
      <div>
        <h1>Điều khoản sử dụng</h1>
        <h2 className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Giới
                                                                                                                     thiệu</strong>
        </h2><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>1. Sứ mệnh</strong></h3><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chào mừng bạn đến với VN-Homestay!</span>
      </p><p className = 'ql-align-justify'>&nbsp;</p><p className = 'ql-align-justify'><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>VN-Homestay là sàn giao dịch thương mại điện tử trực truyến được tạo ra nhằm cung cấp thông tin của những căn hộ cho thuê ngắn hạn tới những người đang tìm kiếm chúng.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>2. Mối quan hệ giữa VN-Homestay và người
                                                                          dùng</strong></h3><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Các tổ chức, hay cá nhân đã, đang và sẽ tham gia giao dịch trên sàn giao dịch thương mại điện tử VN-Homestay, sẽ sẵn sàng tham gia giao dịch với một thái độ tôn trọng quyền và lợi ích của nhau, một cách hợp pháp nhờ có các hợp đồng và không trái với các quy định của pháp luật.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Chúng tôi cung cấp thông tin tại các bài đăng trên Website với mục đích hỗ trợ kết nối Khách hàng (muốn thuê nhà) và Chủ nhà (muốn cho thuê nhà).</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Các thông tin được đăng trên VN-Homestay cần phải được tuân thủ theo tất cả các luật áp dụng (nếu có), không đăng những thông tin hoặc sản phẩm bị cấm bởi pháp luật.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Chúng tôi cũng hoạt động như một kênh giao tiếp giữa Chủ nhà và Khách hàng để có thể giải quyết bất kỳ tranh chấp nào giữa hai bên.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Việc sử dụng Website và dịch vụ trên Website cần phải được thực hiện một cách công khai và minh bạch để đảm bảo quyền lợi và sự an toàn của các bên.</span>
      </p><p className = 'ql-align-justify'><br /></p><h2 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>II. Quy trình giao dịch</strong></h2><h3
        className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Quy
                                                                                                                 trình
                                                                                                                 dành
                                                                                                                 cho
                                                                                                                 Khách
                                                                                                                 hàng</strong>
      </h3><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Website VN-Homestay được thiết kế để có thể hỗ trợ một cách đầy đủ và thuận tiện nhất cho người sử dụng.</span>
      </p><p className = 'ql-align-justify'><br /></p><h4 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Quá trình đăng ký tài khoản</strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>:</span></h4><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Điền email và đặt mật khẩu cho tài khoản.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Kích hoạt tài khoản thông qua email (bạn sẽ nhận được email kích hoạt tài khoản ngay sau khi đăng kí).</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Đăng nhập, vào Thông tin cá nhân, cập nhật các thông tin:</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ Giới tính</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ Họ tên</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ Số điện thoại</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ Email</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ Ngày sinh</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ Các thông tin không bắt buộc khác (như địa chỉ, mô tả bản thân,..)</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Các thông tin cá nhân của bạn sẽ được bảo mật cẩn thận.</span>
      </p><p className = 'ql-align-justify'><br /></p><h4 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Quá trình thực hiện giao dịch:</strong></h4><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Khi Khách hàng muốn thuê bất kỳ một căn hộ nào đó được đăng trên trang web, có một vài lưu ý như sau:</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Tìm kiếm căn hộ phù hợp nhất trên trang web, sau đó cẩn thận đưa ra quyết định cuối cùng.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Sau khi tìm thấy một căn homestay thích hợp, bạn có thể đặt phòng trực tiếp trên VN-Homestay.vn hoặc gọi điện cho bộ phận chăm sóc khách hàng (bằng số hotline) để đặt qua điện thoại. Thông tin được ghi ở trên Website.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Bạn sẽ phải hoàn thành thủ tục thanh toán ngay trong quá trình đặt phòng để có thể nhận được email xác nhận đặt phòng từ VN-Homestay.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Chúng tôi yêu cầu tất cả các đối tác của chúng tôi, các chủ sở hữu căn hộ, cung cấp thông tin một cách đầy đủ, chính xác, chi tiết và trung thực về căn hộ của mình.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Tất cả các hành vi lừa đảo, gian lận, lừa đảo trong quá trình giao dịch sẽ bị lên án và phải chịu hoàn toàn trách nhiệm theo pháp luật.</span>
      </p><p className = 'ql-align-justify'><br /></p><h4 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>VN-Homestay sẽ đảm bảo:</strong></h4><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Thông tin về giá cả do Chủ nhà đặt ra là toàn vẹn, không bị chỉnh sửa bởi VN-Homestay khi chưa được Chủ nhà đồng ý.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Thông tin về chất lượng và tiêu chuẩn của căn hộ đúng với mô tả tại thời điểm Chủ nhà đăng bài trên Website.</span>
      </p><p className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Trong trường hợp khách hàng của VN-Homestay bày tỏ
                                                                          sự không hài lòng đối với dịch vụ, chúng tôi
                                                                          sẽ thông tin lại với Chủ nhà để:</strong></p>
        <p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Nâng cấp các căn hộ và cung cấp dịch vụ tốt hơn.</span>
        </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Cung cấp gói dịch vụ miễn phí khác (nếu có thể).</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Gợi ý các địa điểm thay thế mà ở đó chất lượng căn hộ và dịch vụ ngang bằng có khi tốt hơn (nếu có thể).</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Trong trường hợp xấu nhất, chúng tôi sẽ xem xét để yêu cầu Chủ nhà hoàn trả tiền cho quý khách.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>2. Quá trình đăng tin của Chủ nhà</strong>
      </h3><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chủ nhà có quyền đăng các thông tin trực tiếp lên trang homestay của mình. Tuy nhiên, nếu như VN-Homestay phát hiện ra các thông tin sai sự thật, Chủ nhà buộc phải gỡ và chỉnh sửa các thông tin đó. Đồng thời, Chủ nhà không thể tự xóa các đánh giá của Khách hàng. Nếu thực sự cần xóa/ chỉnh sửa các đánh giá này, Chủ nhà cần liên hệ với VN-Homestay và đưa ra các lí do hợp lí.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>3. Đảm bảo an toàn giao dịch</strong></h3><h4
        className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Cam
                                                                                                                 kết:</strong>
      </h4><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Để thực hiện các giao dịch thành công, hạn chế tối đa các rủi ro có thể phát sinh, người dùng VN-Homestay không nên cung cấp thông tin chi tiết về các khoản thanh toán cho bất kỳ ai bằng e-mail. Chúng tôi không chịu trách nhiệm cho bất kỳ tổn thất nào (là kết quả của sự trao đổi thông tin qua internet hoặc e-mail) gây ra bởi người dùng.</span>
      </p><p className = 'ql-align-justify'><br /></p><h4 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Cơ chế:</strong></h4><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Cơ chế chúng tôi sử dụng để đảm bảo các giao dịch như sau:</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Quản lý thành viên: thành viên của VN-Homestay.com phải cung cấp đầy đủ các thông tin có liên quan và chịu trách nhiệm về tính xác thực của những thông tin này. Chúng tôi sẽ ghi lại tất cả các thông tin cá nhân và tình trạng pháp lý của bạn cho mục đích quản lý. Chúng tôi sẽ cập nhật thông tin thường xuyên đồng thời tạo ra những đánh giá dựa trên các thông tin này.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Chúng tôi cũng đánh giá chủ nhà qua những lần nhận xét, phản hồi và ý kiến của khách hàng</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Chúng tôi sẽ nỗ lực hết sức để giải quyết bất kỳ khiếu nại và tranh chấp có thể phát sinh. Quyền lợi của bạn sẽ được bảo vệ bởi chúng tôi hoặc sự can thiệp của các cơ quan chính quyền địa phương.</span>
      </p><p className = 'ql-align-justify'><br /></p><h2 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>III. Quy trình thanh toán</strong></h2><h3
        className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>1. Đối
                                                                                                                 với
                                                                                                                 Khách
                                                                                                                 hàng</strong>
      </h3><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Cho tới thời điểm hiện tại, VN-Homestay cung cấp 3 hình thức thanh toán như sau để giúp giao dịch của khách hàng với chúng tôi trở nên thuận tiện nhất.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Sử dụng thẻ tín dụng Visa/ Master Card hoặc thẻ ATM nội địa.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Chuyển khoản tới STK của VN-Homestay (ngân hàng Vietcombank hoặc Techcombank).</span>
      </p><p className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}><em>Lưu ý: </em></strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Việc thanh toán cần được thực hiện ngay trong quá trình đặt phòng, sau đó bạn mới nhận được email xác nhận đặt phòng từ VN-Homestay.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>2. Đối với Chủ nhà</strong></h3><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Sau khi khách hàng check-out, chúng tôi sẽ chuyển phần phí đặt phòng cho Chủ nhà (đã khấu trừ đi phí hoa hồng được nhận theo thỏa thuận) sau 1-2 ngày.</span>
      </p><p className = 'ql-align-justify'><br /></p><h2 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>IV. Chính sách hủy và chuyển nhượng</strong>
      </h2><h3 className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>1.
                                                                                                                        Chính
                                                                                                                        sách
                                                                                                                        hủy</strong>
      </h3><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>VN-Homestay cho phép các Chủ nhà lựa chọn một trong số các chính sách hủy phòng tiêu chuẩn: Linh hoạt, Nghiêm ngặt, Riêng mà chúng tôi sẽ thực hiện, để bảo vệ quyền lợi của khách và chủ nhà. Tại mỗi trang homestay trên VN-Homestay, chúng tôi sẽ nêu rõ chính sách hủy để khách hàng có thể cập nhật. </span>
      </p><p className = 'ql-align-justify'><br /></p><h4 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chính sách Linh hoạt:</strong><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(102, 102, 102)'}}> </strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Miễn phí hủy phòng khi hủy 5 ngày trước khi nhận phòng.</span>
      </h4><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Tổng chi phí đặt phòng sẽ được hoàn lại 100% nếu khách hàng hủy đơn đặt phòng trước 5 ngày so với ngày đến nhận phòng. Khách hàng không được hoàn tiền trong vòng 5 ngày trước ngày nhận phòng. </span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Nếu khách hủy đơn đặt phòng trong vòng 5 ngày trước ngày nhận phòng, khách buộc phải chịu 100% số tiền đã thanh toán, không được hoàn trả.</span>
      </p><p className = 'ql-align-justify'><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Ví dụ: Khách hàng có đơn đặt phòng giá trị 500.000đ, check-in vào ngày 14/02/2019, khách hàng sẽ được hoàn lại 500.000đ khi hủy phòng muộn nhất trước 23:59 ngày 08/02/2019. Bắt đầu từ 00:00 ngày 09/02, khách hàng sẽ không được hoàn lại khoản tiền nào. </span>
      </p><p className = 'ql-align-justify'><br /></p><h4 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chính sách Nghiêm ngặt:</strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}> Hoàn lại 50% giá trị đơn đặt phòng khi khách hủy 5 ngày trước khi nhận phòng. </span>
      </h4><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>50% chi phí đặt phòng sẽ được hoàn lại, nếu khách hàng hủy đơn đặt phòng muộn nhất trước 5 ngày so với ngày đến nhận phòng. Khách hàng không được hoàn tiền trong vòng 7 ngày trước ngày nhận phòng.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Nếu khách hủy đơn đặt phòng trong vòng 5 ngày trước ngày nhận phòng, khách buộc phải chịu 100% số tiền đã thanh toán, không được hoàn trả.</span>
      </p><p className = 'ql-align-justify'><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Ví dụ: Khách hàng có đơn đặt phòng giá trị 500.000đ, check-in vào ngày 14/02/2019, khách hàng sẽ được hoàn lại 250.000đ khi hủy phòng muộn nhất trước 23:59 ngày 08/02/2019. Bắt đầu từ 00:00 ngày 09/02, khách hàng sẽ không được hoàn lại khoản tiền nào. </span>
      </p><p className = 'ql-align-justify'><br /></p><h4 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chính sách Riêng của Chủ nhà: </strong></h4><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chủ nhà tự đăng tải và lựa chọn chính sách hủy riêng và phải được niêm yết, công bố công khai về chính sách hủy đăng tải trên VN-Homestay.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(67, 67, 67)'}}>2. Chính sách chuyển nhượng</strong></h3><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Khách hàng đã đặt phòng thành công nếu không còn nhu cầu sử dụng đơn hàng đó có quyền chuyển nhượng lại cho bên thứ ba.</span>
      </p><p className = 'ql-align-justify'><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Giao dịch chuyển nhượng này phải chịu chi phí giao dịch tương tự một giao dịch đặt phòng bình thường trên VN-Homestay.</span>
      </p><p className = 'ql-align-justify'><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Bên Chuyển Nhượng lại có trách nhiệm thông báo cho VN-Homestay và Chủ Nhà về việc thực hiện giao dịch này để hoàn thiện các thủ tục cần thiết theo quy định của VN-Homestay.</span>
      </p><p className = 'ql-align-justify'><br /></p><h2 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>V. Bảo vệ thông tin khách hàng</strong></h2>
        <h3 className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>1.
                                                                                                                     Mục
                                                                                                                     đích
                                                                                                                     và
                                                                                                                     phạm
                                                                                                                     vi
                                                                                                                     thực
                                                                                                                     hiện</strong>
        </h3><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chúng tôi thu thập thông tin của bạn với mục đích duy nhất là để quản lý tài khoản của bạn, đăng ký tài khoản, liên lạc khi có tranh chấp xảy ra, cung cấp cho các đối tác của chúng tôi thông tin của bạn nếu cần thiết. Chúng tôi cam kết không bán, chia sẻ hoặc trao đổi thông tin cá nhân của bạn.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Các loại thông tin mà chúng tôi thu thập là: tên, địa chỉ, số điện thoại, email.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>2. Việc sử dụng thông tin</strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(67, 67, 67)'}}>	</span></h3><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Các thông tin của người dùng VN-Homestay sẽ được sử dụng và chỉ được sử dụng cho mục đích kiểm soát, quản lý hoạt động của các thành viên và tạo thuận lợi cho việc thực hiện giao dịch.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>3. Thời gian lưu trữ thông tin </strong></h3>
        <p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Thông tin của người dùng sẽ được lưu trữ từ 02 cho đến 10 năm. Ngoại trừ những trường hợp người dùng tự xóa bỏ tài khoản hoặc thông tin cá nhân.</span>
        </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Địa chỉ bộ phận quản lý thông tin khách hàng	</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Công ty Cổ phần VN-Homestay</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Địa chỉ: Tầng 3, Hà Thành Plaza, số 102 Thái Thịnh, Đống Đa, Hà Nội</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Điện thoại: 0916 374 057</span>
      </p><p className = 'ql-align-justify'><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Email: </span><a
        href = 'mailto:info@VN-Homestay.org' target = '_blank'
        style = {{backgroundColor: 'transparent', color: 'rgb(17, 85, 204)'}}>phamducnhat96@gmail.com</a></p><p
        className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>4. Chỉnh sửa thông tin cá nhân </strong></h3>
        <p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chủ nhà và Khách hàng có thể chỉnh sửa thông tin cá nhân của mình trong mục tài khoản ở trên trang web.</span>
        </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>5. Cam kết bảo mật thông tin Khách
                                                                          hàng </strong></h3><p
        className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Chúng tôi cam kết thông tin của bạn sẽ được bảo mật tuyệt đối, theo chính sách bảo mật thông tin của VN-Homestay. Việc thu thập và sử dụng thông tin cho mỗi người dùng chỉ được thực hiện khi có sự đồng ý của người dùng đó, trừ trường hợp bị quy định bởi pháp luật. Người dùng có quyền kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình theo đúng quy trình của chúng tôi. Chúng tôi sẽ không tiết lộ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào hoặc sử dụng thông tin đó bên ngoài trang web, ngoại trừ những trường hợp sau đây:</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Việc cung cấp thông tin cá nhân cho các bên thứ ba có sự đồng ý của người dùng.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Bên thứ ba là những bên được thuê bởi VN-Homestay để quản lý máy chủ, phát triển website và hỗ trợ quá trình thanh toán. Trong trường hợp này, hợp đồng giữa VN-Homestay và các bên thứ ba đó phải xác định rõ trách nhiệm của mỗi bên trong việc bảo vệ thông tin người dùng, không chia sẻ thông tin đó với bất cứ ai và chỉ bên thứ ba sử dụng thông tin của các người dùng để thực hiện nhiệm vụ của mình. Nếu hệ thống của chúng tôi xảy ra lỗi và làm mất thông tin cá nhân của người dùng, chúng tôi sẽ triển khai sửa chữa và các bên thứ ba của chúng tôi sẽ thông báo cho các cơ quan chính phủ có thẩm quyền trong vòng 24 giờ sau khi vấn đề được phát hiện ra. Theo yêu cầu của các cơ quan chính phủ hợp pháp, tất cả các hành vi cố ý tiết lộ thông tin khách hàng hoặc làm sai thông tin khách hàng đều đáng bị khiển trách và xử lý. Nếu bạn có bất kỳ khiếu nại gì về vấn đề những thông tin của mình được sử dụng không đúng và chính xác, chúng tôi sẽ có cơ chế xác minh nhất định và xử lý phù hợp, hoặc nếu cần thiết, chúng tôi sẽ yêu cầu sự can thiệp của chính phủ.</span>
      </p><p className = 'ql-align-justify'><br /></p><h2 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>VI. Giải quyết tranh chấp</strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>		</span></h2><h3
        className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>1. Các
                                                                                                                 bước
                                                                                                                 giải
                                                                                                                 quyết
                                                                                                                 tranh
                                                                                                                 chấp:</strong>
      </h3><p className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Bước
                                                                                                                       1: </strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Sau khi nhận được bất kỳ khiếu nại về dịch vụ qua email hoặc tổng đài chăm sóc khách hàng, chúng tôi sẽ liên lạc với các chủ nhà và yêu cầu sự giải thích rõ ràng sau đó cung cấp đầy đủ chi tiết liên hệ để giải quyết các tranh chấp. VN-Homestay sẵn sàng trở thành cầu nối giao tiếp giữa chủ nhà và khách thuê nhà. Chúng tôi khuyến khích khách hàng giải quyết các tranh chấp trên cơ sở hòa bình và thương lượng. Các bạn có trách nhiệm cập nhật tình hình cho VN-Homestay để chúng tôi xác thực và giải quyết vấn đề một cách nhanh chóng nhất.</span>
      </p><p className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Bước
                                                                                                                      2:</strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}> Nếu sau 3 ngày chúng tôi không thể liên lạc được với chủ nhà, hoặc người có liên quan tới tranh chấp, hoặc liên lạc nhưng bị từ chối, không chủ động giải quyết các vấn đề thì hợp đồng ký kết giữa chủ nhà và VN-Homestay sẽ bị chấm dứt hoàn toàn ngay lập tức.</span>
      </p><p className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Bước
                                                                                                                      3:</strong><span
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}> Người khiếu nại cũng có quyền đưa vụ tranh chấp lên cho các cơ quan chính quyền địa phương có thẩm quyền để giải quyết. Chúng tôi sẽ hỗ trợ đầy đủ cho người khiếu nại và cung cấp tất cả các thông tin cần thiết để giải quyết vấn đề khi có yêu cầu.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>2. Khách hàng gửi khiếu nại tại địa
                                                                          chỉ:</strong></h3><p
        className = 'ql-align-justify'><strong style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Đặt phòng trực tuyến VN-Homestay</strong>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Điện thoại: 0916 374 057</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Email: phamducnhat96@gmail.com</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>Thời gian tiếp nhận và xử lý phản ánh là 3 (ba) ngày làm việc kể từ thời điểm VN-Homestay nhận được phản ánh từ phía khách hàng.</span>
      </p><p className = 'ql-align-justify'><br /></p><h3 className = 'ql-align-justify'><strong
        style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>3. Trách nhiệm của các bên liên quan:</strong>
      </h3><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- VN-Homestay tôn trọng và nghiêm túc thực hiện các quy định của pháp luật về bảo vệ quyền lợi của khách hàng. Vì vậy, đề nghị khách hàng và chủ nhà cung cấp đầy đủ, chính xác, trung thực và chi tiết các thông tin liên quan đến dịch vụ. Mọi hành vi lừa đảo, gian lận trong kinh doanh đều bị lên án và phải chịu hoàn toàn trách nhiệm trước pháp luật.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>- Các bên bao gồm khách hàng và chủ nhà sẽ phải có vai trò trách nhiệm trong việc tích cực giải quyết vấn đề. Chủ nhà cần có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang gây mâu thuẫn cho khách hàng. VN-Homestay sẽ có trách nhiệm cung cấp những thông tin liên quan đến khách hàng và chủ nhà nếu được chủ nhà hoặc khách hàng (liên quan đến tranh chấp đó) yêu cầu. Sau khi chủ nhà và khách hàng đã giải quyết xong tranh chấp phải có trách nhiệm báo lại cho ban quản trị VN-Homestay. Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về chủ nhà:</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ VN-Homestay sẽ có biện pháp cảnh cáo, khóa tài khoản hoặc chuyển cho cơ quan pháp luật có thẩm quyền tùy theo mức độ của sai phạm. VN-Homestay sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về căn hộ của chủ nhà đó trên website, đồng thời yêu cầu chủ nhà bồi hoàn cho khách hàng thỏa đáng trên cơ sở thỏa thuận với khách hàng.</span>
      </p><p className = 'ql-align-justify'><span style = {{backgroundColor: 'transparent', color: 'rgb(0, 0, 0)'}}>+ Nếu thông qua hình thức thỏa thuận mà vẫn không thể giải quyết được mâu thuẫn phát sinh từ giao dịch giữa 2 bên chủ nhà và khách hàng, thì một trong 2 bên chủ nhà và khách hàng sẽ có quyền nhờ đến cơ quan pháp luật có thẩm quyền can thiệp nhằm đảm bảo lợi ích hợp pháp của các bên, nhất là cho khách hàng.</span>
      </p>
      </div>
			</Grid>
      </GridContainer>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(TermsOfConditions);
