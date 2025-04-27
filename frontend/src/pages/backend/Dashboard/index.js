const Dashboard = () => {
    return (
        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-r from-blue-100 to-green-100 p-6">
                <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Chào mừng bạn đến với trang Dashboard!</h2>
                <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
                    <h3 className="text-3xl font-semibold mb-4 text-gray-800">Bảng điều khiển của bạn</h3>
                    <p className="text-gray-600 mb-6">
                        Đây là nơi bạn có thể theo dõi và quản lý tất cả thông tin quan trọng của mình.
                    </p>
                    <p className="text-gray-600 mb-8">
                        Hãy khám phá những thông tin và số liệu bên dưới để nắm bắt tình hình hiện tại.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Thêm các thẻ thông tin khác nhau */}
                        <div className="bg-blue-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h4 className="font-semibold text-lg text-blue-800">Tổng quan 1</h4>
                            <p className="text-gray-700">Thông tin tổng quan 1 về hoạt động.</p>
                        </div>
                        <div className="bg-green-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h4 className="font-semibold text-lg text-green-800">Tổng quan 2</h4>
                            <p className="text-gray-700">Thông tin tổng quan 2 về dữ liệu.</p>
                        </div>
                        <div className="bg-red-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h4 className="font-semibold text-lg text-red-800">Tổng quan 3</h4>
                            <p className="text-gray-700">Thông tin tổng quan 3 về tiến độ.</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Dashboard;
