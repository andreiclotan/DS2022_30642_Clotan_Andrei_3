require "test_helper"

class DevicesControllersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @devices_controller = devices_controllers(:one)
  end

  test "should get index" do
    get devices_controllers_url, as: :json
    assert_response :success
  end

  test "should create devices_controller" do
    assert_difference("DevicesController.count") do
      post devices_controllers_url, params: { devices_controller: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show devices_controller" do
    get devices_controller_url(@devices_controller), as: :json
    assert_response :success
  end

  test "should update devices_controller" do
    patch devices_controller_url(@devices_controller), params: { devices_controller: {  } }, as: :json
    assert_response :success
  end

  test "should destroy devices_controller" do
    assert_difference("DevicesController.count", -1) do
      delete devices_controller_url(@devices_controller), as: :json
    end

    assert_response :no_content
  end
end
